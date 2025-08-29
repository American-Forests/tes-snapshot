import { STATIC_ASSETS_CLOUDFRONT_URL } from "app/constants"

const SpecialFonts = () => (
  <style jsx global>{`
    @font-face {
      font-family: 'GT Walsheim';
      src: url('${STATIC_ASSETS_CLOUDFRONT_URL}/fonts/GTWalsheimPro-Regular.woff2') format('woff2'),
           url('${STATIC_ASSETS_CLOUDFRONT_URL}/fonts/GTWalsheimPro-Regular.woff') format('woff');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'GT Walsheim';
      src: url('${STATIC_ASSETS_CLOUDFRONT_URL}/fonts/GTWalsheimPro-Bold.woff2') format('woff2'),
           url('${STATIC_ASSETS_CLOUDFRONT_URL}/fonts/GTWalsheimPro-Bold.woff') format('woff');
      font-weight: bold;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'GT Walsheim Condensed';
      src: url('${STATIC_ASSETS_CLOUDFRONT_URL}/fonts/GTWalsheimPro-CondensedBold.woff2') format('woff2'),
           url('${STATIC_ASSETS_CLOUDFRONT_URL}/fonts/GTWalsheimPro-CondensedBold.woff') format('woff');
      font-weight: bold;
      font-style: normal;
      font-display: swap;
    }
  `}</style>
)

export default SpecialFonts