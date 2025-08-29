import { STATIC_ASSETS_CLOUDFRONT_URL } from "app/constants"

interface BackgroundProps {
  image?: string;
  style: 'cover' | 'contain'
}

const BackgroundImage: React.FC<BackgroundProps> = ({ 
    image, 
    style = 'cover'
  }) => {
    const baseStyle = "sticky flex-1 w-full m-0 z-0 items-center justify-center sticky-thing absolute bg-center bg-no-repeat z-0"
    const styleClasses = {
      cover: "bg-cover top-0 h-screen",
      contain: "bg-contain top-40 h-[calc(100vh-20rem)]"
    }
  
    return (
      <div
        className={`${baseStyle} ${styleClasses[style]}`}
        style={{
          backgroundImage: `url(${STATIC_ASSETS_CLOUDFRONT_URL}/stories${image})`
        }}
      />
    )
  }
  
  export default BackgroundImage