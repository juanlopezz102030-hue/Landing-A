export default function handler(req, res) {
  const userAgent = req.headers['user-agent'] || '';
  const isMobile = /Android|iPhone|iPad|iPod/i.test(userAgent);
  
  const metaBots = [
    'facebookexternalhit', 'Facebot', 'FacebookBot', 'meta-externalfetch', 'metaexternalhit'
  ];
  const isMetaBot = metaBots.some(bot => userAgent.toLowerCase().includes(bot.toLowerCase()));

  // Podés usar una Variable de Entorno de Vercel o dejar el link fijo acá
  const whatsappUrl = process.env.WHATSAPP_URL || "https://wa.me/5521920234018?text=Hola,%20quiero%20iniciar%20una%20conversación.";

  // Si es un usuario real en celular, redirige en el acto
  if (!isMetaBot && isMobile) {
    return res.redirect(302, whatsappUrl);
  }

  // Si es Meta o PC, lo mandamos a la landing limpia (index.html)
  return res.redirect(302, '/index.html');
}
