import { FiHeart } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { artworks } from "@/db/artworks";
import { useNavigate } from "react-router-dom";

const AuctionGallery = () => {
  const navigate = useNavigate();

  const handleBidNowClick = (index: number) => {
    navigate(`/artwork/${index}`);
  };
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {artworks.map((artwork, index) => (
            <div key={index} className="group">
              <div className="relative aspect-square bg-gray-100 mb-3 overflow-hidden rounded-md">
                <img
                  src={artwork.src}
                  alt={artwork.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
                <button className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full">
                  <FiHeart className="h-4 w-4" />
                </button>
              </div>
              <h3 className="font-medium">{artwork.title}</h3>
              <p className="text-sm text-gray-600">{artwork.artist}</p>
              <div className="flex justify-between items-center mt-2">
                <div>
                  <p className="text-xs text-gray-500">{artwork.priceType}</p>
                  <p className="font-semibold">{artwork.price}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs rounded-full"
                  onClick={() => handleBidNowClick(index)}
                >
                  Bid Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AuctionGallery;
