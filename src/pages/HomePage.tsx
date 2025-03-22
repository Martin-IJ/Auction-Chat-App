import AuctionGallery from "@/components/AuctionGallery/AuctionGallery";

export default function HomePage() {
  return (
    <main>
      <section className="py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Collect, and Enjoy
            <br />
            Exceptional Art
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore an extraordinary selection of artworks from emerging and
            established artists worldwide.
          </p>
        </div>
      </section>

      {/* Artwork for Sale */}
      <AuctionGallery />
    </main>
  );
}
