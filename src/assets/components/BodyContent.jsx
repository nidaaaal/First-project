import HomeBody from "./HomeBody";

export default function BodyContent() {
  return (
    <div className="space-y-12 p-8">
      <HomeBody
        image="product4.avif"
        title="Men's Fashion"
        description="Upgrade your wardrobe with the latest men's fashion trends, from casual to formal."
        link="/men"
        colour="#6c5545"
      />

      <HomeBody
        image="product1.avif"
        title="Women's Fashion"
        description="Discover elegant styles and trendy outfits for every occasion in women's fashion."
        link="/women"
        colour="#517283"

      />

      <HomeBody
        image="product12.avif"
        title="Kids' Fashion"
        description="Find comfortable and stylish clothing for your little ones with our kids' fashion collection."
        link="/kids"
        colour="#ce9e99"
      />
    </div>
  );
}
