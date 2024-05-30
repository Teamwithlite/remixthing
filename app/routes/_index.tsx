import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Index() {
  return (
    <div>
      <nav className="bg-black flex px-5 py-5 mb-5 text-white text-2xl font-bold">
        Remix Test
      </nav>
      <div className="flex space-x-3 px-4">
        <Button>Submit</Button>
        <Input />
      </div>
    </div>
  );
}
