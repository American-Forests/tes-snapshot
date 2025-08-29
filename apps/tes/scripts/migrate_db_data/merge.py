import pandas as pd

old_users = pd.read_csv('./data/old/users.csv')
current_users = pd.read_csv('./data/current/users.csv')

merged_users = pd.merge(
    current_users,
    old_users[['email', 'id']].rename(columns={'id': 'oldId'}),
    on='email',
    how='left'
)

# Get emails that are already in merged_users
existing_emails = merged_users['email'].tolist()

# Filter old users to only those not already in merged_users
old_users_not_in_new = old_users[~old_users['email'].isin(existing_emails)]
old_users_not_in_new['oldId'] = old_users_not_in_new['id']

max_id = max(merged_users.id)

# Convert old_users_not_in_new to list of dictionaries for manipulation
users_to_add = old_users_not_in_new.to_dict('records')

for user in users_to_add:
    max_id += 1
    user['id'] = max_id
    
# Convert list of dictionaries back to DataFrame and concatenate
merged_users = pd.concat([merged_users, pd.DataFrame(users_to_add)], ignore_index=True)

merged_users = merged_users[['id', 'oldId'] + [col for col in merged_users.columns if col not in ['id', 'oldId']]]

# Convert id and oldId columns to int, replacing NaN with -1
merged_users['id'] = merged_users['id'].fillna(-1).astype(int)
merged_users['oldId'] = merged_users['oldId'].fillna(-1).astype(int)

merged_users = merged_users.reset_index()

# Drop the index column
merged_users = merged_users.drop('index', axis=1)

# Assert that id is unique for all rows
assert len(merged_users['id']) == len(merged_users['id'].unique()), "Duplicate IDs found in merged_users dataframe"

old_scenarios = pd.read_csv('./data/old/scenarios.csv')
current_scenarios = pd.read_csv('./data/current/scenarios.csv')

# Create mapping from oldId to new id
id_mapping = merged_users.set_index('oldId')['id'].to_dict()

# Update userId in old_scenarios using the mapping
old_scenarios['userId'] = old_scenarios['userId'].map(id_mapping)

# Verify no null values were introduced
assert not old_scenarios['userId'].isnull().any(), "Some userIds could not be mapped to new ids"

# Get the maximum id from current scenarios
max_current_id = current_scenarios['id'].max()

# Create mapping from old scenario ids to new ids
# New ids will start from max_current_id + 1
old_scenario_ids = old_scenarios['id'].unique()
new_scenario_ids = range(max_current_id + 1, max_current_id + 1 + len(old_scenario_ids))
scenario_id_mapping = dict(zip(old_scenario_ids, new_scenario_ids))

# Update ids in old_scenarios using the mapping
old_scenarios['id'] = old_scenarios['id'].map(scenario_id_mapping)

# Verify no null values were introduced
assert not old_scenarios['id'].isnull().any(), "Some scenario ids could not be mapped to new ids"

# Verify all new ids are integers
assert old_scenarios['id'].dtype == 'int64', "New scenario ids must be integers"

old_area_on_scenarios = pd.read_csv('./data/old/areaOnScenarios.csv')
old_bg_on_scenarios = pd.read_csv('./data/old/blockgroupOnScenarios.csv')

old_area_on_scenarios['scenarioId'] = old_area_on_scenarios['scenarioId'].map(scenario_id_mapping)
old_bg_on_scenarios['scenarioId'] = old_bg_on_scenarios['scenarioId'].map(scenario_id_mapping)

current_area_on_scenarios = pd.read_csv('./data/current/areaOnScenarios.csv')
current_bg_on_scenarios = pd.read_csv('./data/current/blockgroupOnScenarios.csv')

merged_area_on_scenarios = pd.concat([old_area_on_scenarios, current_area_on_scenarios], ignore_index=True)
merged_bg_on_scenarios = pd.concat([old_bg_on_scenarios, current_bg_on_scenarios], ignore_index=True)
merged_scenarios = pd.concat([current_scenarios, old_scenarios], ignore_index=True)
merged_users = merged_users.drop('oldId', axis=1)

# Sort users and scenarios by id before saving
merged_users = merged_users.sort_values('createdAt')
merged_scenarios = merged_scenarios.sort_values('createdAt')

merged_users = merged_users.assign(id_old=merged_users['id'])
merged_users = merged_users.reset_index(drop=True)
merged_users['id'] = merged_users.index + 1

final_users_id_mapping = dict(zip(merged_users['id_old'], merged_users['id']))
merged_scenarios['userId'] = merged_scenarios['userId'].map(final_users_id_mapping)

merged_scenarios = merged_scenarios.assign(id_old=merged_scenarios['id'])
merged_scenarios = merged_scenarios.reset_index(drop=True)
merged_scenarios['id'] = merged_scenarios.index + 1

# Create final mapping for scenarios and update related tables
final_scenarios_id_mapping = dict(zip(merged_scenarios['id_old'], merged_scenarios['id']))

# Update scenario IDs in area and blockgroup tables
merged_area_on_scenarios['scenarioId'] = merged_area_on_scenarios['scenarioId'].map(final_scenarios_id_mapping)
merged_bg_on_scenarios['scenarioId'] = merged_bg_on_scenarios['scenarioId'].map(final_scenarios_id_mapping)

# Drop the temporary id_old column from scenarios
merged_scenarios = merged_scenarios.drop('id_old', axis=1)
merged_users = merged_users.drop('id_old', axis=1)

# Write merged data to CSV files
merged_scenarios.to_csv('./data/merged/scenarios.csv', index=False)
merged_area_on_scenarios.to_csv('./data/merged/areaOnScenarios.csv', index=False) 
merged_bg_on_scenarios.to_csv('./data/merged/blockgroupOnScenarios.csv', index=False)

# drop old id from merged users and save 
merged_users.to_csv('./data/merged/users.csv', index=False)

