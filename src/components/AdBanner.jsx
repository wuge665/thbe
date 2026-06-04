export default function AdBanner({ format }) {
  return (
    <div className="ad-placeholder" data-format={format || 'auto'}>
      <ins className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-5148253505955374"
        data-ad-slot=""
        data-ad-format={format || 'auto'}
        data-full-width-responsive="true"
      />
    </div>
  )
}
