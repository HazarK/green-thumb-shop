import Link from "next/link";
import { PlantArt } from "@/components/art/PlantArt";
import { btnPrimary, btnSecondary, container } from "@/components/ui";

export default function NotFound() {
  return (
    <div className={`${container} py-16 text-center`}>
      <div className="mx-auto w-40 rounded-[2rem] bg-sun-soft p-4">
        <PlantArt kind="cactus" className="w-full" />
      </div>
      <h1 className="mt-6 text-4xl font-semibold text-forest">We couldn&rsquo;t find that page</h1>
      <p className="mx-auto mt-2 max-w-md text-muted">
        It may have been moved, or the plant or product no longer exists. Let&rsquo;s get you back to something green.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/plant-hub" className={btnPrimary}>Go to Plant Hub</Link>
        <Link href="/" className={btnSecondary}>Back to the shop</Link>
      </div>
    </div>
  );
}
