import { useNavigate, useParams } from "react-router-dom";
import { artworks } from "@/db/artworks";
import { Button } from "@/components/ui/button";

const ArtworkDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const artwork = id ? artworks[parseInt(id, 10)] : undefined;

  const otherArtworks = id
    ? artworks.filter((_, index) => index !== parseInt(id, 10))
    : [];

  const handleBidNowClick = (index: number) => {
    navigate(`/artwork/${index}`);
  };

  if (!artwork) {
    return <div>Artwork not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center flex-col md:flex-row">
        <div className="md:w-1/2">
          <img
            src={artwork.src}
            alt={artwork.title}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h1 className="text-4xl font-bold mb-4">{artwork.title}</h1>
          <p className="text-gray-600 mb-4">{artwork.artist}</p>
          <p className="text-gray-600 mb-4">{artwork.priceType}</p>
          <p className="text-gray-600 mb-4">{artwork.price}</p>
          <Button variant="outline" size="lg">
            Chat Room
          </Button>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Other Artworks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {otherArtworks.map((art, index) => (
            <div key={index} className="group">
              <div className="relative aspect-square bg-gray-100 mb-3 overflow-hidden rounded-md">
                <img
                  src={art.src}
                  alt={art.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-medium">{art.title}</h3>
              <p className="text-sm text-gray-600">{art.artist}</p>
              <div>
                <div>
                  <p className="text-xs text-gray-500">{art.priceType}</p>
                  <p className="font-semibold">{art.price}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs rounded-full"
                  onClick={() =>
                    handleBidNowClick(
                      artworks.findIndex((a) => a.title === art.title)
                    )
                  }
                >
                  Bid Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetails;
