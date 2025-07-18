import { Helmet } from 'react-helmet-async';

// Set to true if you are in production, false otherwise
// This ensures scripts only run when your site is live
const isProduction = process.env.NODE_ENV === 'production';

const AnalyticsProvider = () => {
  return (
    <Helmet>
      {isProduction && (
        <>
          {/* === Google Analytics === */}
          {/* Google tag (gtag.js) */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-V35MFN8KXM"></script>
          <script>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-V35MFN8KXM');
            `}
          </script>

          {/* === Google AdSense === */}
          {/*
          <script 
            async 
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=YOUR_ADSENSE_CLIENT_ID" 
            crossOrigin="anonymous">
          </script>
          */}

          {/* === Add other script tags here === */}
        </>
      )}

      {/* === Google Search Console (Verification) === */}
      {/* This can be active in both development and production */}
      {/* 
      <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
      */}

    </Helmet>
  );
};

export { AnalyticsProvider };
