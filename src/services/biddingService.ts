interface Bid {
  userId: string;
  amount: number;
  timestamp: number;
}

interface Auction {
  artworkId: number;
  bids: Bid[];
  highestBid?: Bid;
}

const auctions: Record<string, Auction> = {};

export const startAuction = (artworkId: number) => {
  const auctionId = `artwork-${artworkId}`;
  auctions[auctionId] = { artworkId, bids: [] };
  console.log(`Auction started for artwork ${artworkId}`);
};

export const placeBid = (auctionId: string, bid: Bid) => {
  const auction = auctions[auctionId];
  if (!auction) {
    throw new Error(`Auction ${auctionId} not found`);
  }

  auction.bids.push(bid);
  if (!auction.highestBid || bid.amount > auction.highestBid.amount) {
    auction.highestBid = bid;
    notifyHighestBidder(auctionId, bid);
  }
};

const notifyHighestBidder = (auctionId: string, bid: Bid) => {
  // Notify the highest bidder
  console.log(`New highest bid for auction ${auctionId}: ${bid.amount} by user ${bid.userId}`);
};

export const endAuction = (auctionId: string) => {
  const auction = auctions[auctionId];
  if (!auction) {
    throw new Error(`Auction ${auctionId} not found`);
  }

  if (auction.highestBid) {
    generateInvoice(auction.highestBid);
  }

  delete auctions[auctionId];
  console.log(`Auction ${auctionId} ended`);
};

const generateInvoice = (bid: Bid) => {
  // Invoice for the highest bidder
  console.log(`Invoice generated for user ${bid.userId} with amount ${bid.amount}`);
};