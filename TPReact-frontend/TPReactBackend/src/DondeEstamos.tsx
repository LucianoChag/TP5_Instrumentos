const DondeEstamos = () => {
  return (
    <div
      className="ubicacion"
    >
      <h1 className="donde-estamos-title">¿Dónde estamos? </h1>
      <p>Rioja y Catamarca, Ciudad de Mendoza</p>
      <iframe
        className="google-map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3350.332142407145!2d-68.8383887244259!3d-32.88938557361693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e09186f37cd5f%3A0xf55fa7e7178c0d39!2sRioja%20y%20Catamarca%20(Capital%2C%20Mendoza)!5e0!3m2!1ses-419!2sar!4v1714745827669!5m2!1ses-419!2sar"
        width="600"
        height="450"
        loading="lazy"
        title="Mapa de Google"
      ></iframe>
    </div>
  );
};

export default DondeEstamos;
