import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Home() {
  return (
    <>
      <div className="flex w-96 max-w-full gap-2 mx-auto">
        <Input placeholder="0xabc12..." />
        <Button>
          Track
          <Icon name="magnify" />
        </Button>
      </div>
    </>
  );
}
