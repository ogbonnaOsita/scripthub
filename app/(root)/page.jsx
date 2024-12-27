import { cookies } from "next/headers";
import { decrypt } from "../lib/session";
import ScriptCard from "../components/ScriptCard";
import LoginOverlay from "../components/LoginOverlay";
import mockData from "../lib/mock-data.json";
import SearchInput from "../components/SearchInput";
import DisplayModal from "../components/DisplayModal";

export default async function Home() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("session")?.value;

  let isLoggedIn = false;

  if (cookie) {
    const session = await decrypt(cookie);
    if (session?.userId) {
      isLoggedIn = true;
    }
  }

  const yourScripts = mockData.scripts.filter((script) => script.bought);

  return (
    <div className="relative">
      {!isLoggedIn && <LoginOverlay />}

      <section id="ad-section" className="py-4">
        <div className="container mx-auto px-4">
          <div className="md:aspect-[728/90] aspect-[728/160] flex items-center justify-center bg-gray-300">
            <h1 className="text-2xl">Your Ad goes here</h1>
          </div>
        </div>
      </section>

      <div className="container mx-auto py-4 px-4">
        <SearchInput isLoggedIn={isLoggedIn} />
      </div>

      <section className="container mx-auto py-12 px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Your Scripts</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {yourScripts.map((script) => (
            <ScriptCard
              key={script.id}
              imageUrl={script.imageUrl}
              title={script.title}
              price={script.price}
              bought={script.bought}
              demoVideoUrl={script.demoVideoUrl}
              description={script.description}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </div>
      </section>

      <section className="container mx-auto py-12 px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Recently Added Scripts</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockData.scripts.map((script) => (
            <ScriptCard
              key={script.id}
              imageUrl={script.imageUrl}
              title={script.title}
              price={script.price}
              demoVideoUrl={script.demoVideoUrl}
              description={script.description}
              bought={script.bought}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </div>
      </section>
      <DisplayModal />
    </div>
  );
}
