import { useLanguage } from "../LanguageContext"; // Import the useLanguage hook
import icon1 from "../assets/group_1.png";
import icon2 from "../assets/group_11.png";
import icon3 from "../assets/group_2.png";

function Steps() {
  const { language } = useLanguage();
  return (
    <section className="h-auto bg-[#F7F8FC] relative py-16 mt-4">
      <div className="text-center mb-8">
        <h1 className="sm:text-4xl text-2xl font-medium">
          {language === "en" ? "Seamless steps" : "langkah-langkah mulus"}{" "}
          <span className="text-[#FA9F36]">
            {language === "en" ? "to book" : "untuk memesan"}
          </span>
        </h1>
        <p className="mt-4 text-[#666666]">
          {language === "en"
            ? "Our meticulously designed itineraries and budget-friendly options"
            : "Rencana perjalanan kami yang dirancang dengan cermat dan pilihan yang ramah anggaran"}
          <br />
          {language === "en"
            ? "ensure you can focus on your spiritual journey without worry"
            : "memastikan Anda dapat fokus pada perjalanan spiritual Anda tanpa khawatir"}
        </p>
      </div>

      <div className="grid  grid-cols-3 gap-2 md:gap-6 px-4 sm:px-16 lg:px-32">
        <div className="flex flex-col items-start bg-white rounded-lg p-2 md:p-6">
          <img src={icon1} alt="Browse Hotels" className="mb-4" />
          <h1 className="mb-4 font-semibold sm:text-2xl">
            {language === "en" ? "Browse Hotels" : "Telusuri Hotel"}
          </h1>
          <p className="text-[#666666] text-sm md:text-base">
            {language === "en"
              ? "Completes all the work associated"
              : "Menyelesaikan semua pekerjaan terkait"}
            <br />
            {language === "en"
              ? "with planning and processing"
              : "dengan perencanaan dan pemrosesan"}
          </p>
        </div>
        <div className="flex flex-col items-start bg-white rounded-lg p-2 md:p-6">
          <img src={icon2} alt="Start Booking" className="mb-4" />
          <h1 className="mb-4 font-semibold sm:text-2xl">
            {language === "en" ? "Start Booking" : "Mulai Pemesanan"}
          </h1>
          <p className="text-[#666666] text-sm md:text-base">
            {language === "en"
              ? "After successful access then book"
              : "Setelah akses berhasil lalu pesan"}
            <br />
            {language === "en"
              ? "from exclusive deals & pricing"
              : "dari penawaran & harga eksklusif"}
          </p>
        </div>
        <div className="flex flex-col items-start bg-white rounded-lg p-2 md:p-6">
          <img src={icon3} alt="Exciting Travel" className="mb-4" />
          <h1 className="mb-4 font-semibold sm:text-2xl">
            {language === "en"
              ? "Exciting Travel"
              : "Perjalanan yang Menyenangkan"}
          </h1>
          <p className="text-[#666666] text-sm md:text-base">
            {language === "en"
              ? "Start and explore a wide range of"
              : "Mulailah dan jelajahi berbagai macam"}
            <br />
            {language === "en"
              ? "exciting travel experiences"
              : "pengalaman perjalanan yang mengasyikkan"}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Steps;
