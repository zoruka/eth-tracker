import { ColorPalette } from '@/components/color-palette';
import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Home() {
  return (
    <main className="">
      <ColorPalette />

      <div className="flex w-96 max-w-full gap-2 m-auto">
        <Input placeholder="0xabc12..." />
        <Button>
          Track
          <Icon name="magnify" />
        </Button>
      </div>
    </main>
  );
}
