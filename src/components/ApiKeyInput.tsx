import { useState } from 'react';
import { Eye, EyeOff, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ApiKeyInputProps {
  apiKey: string;
  onApiKeyChange: (key: string) => void;
}

const ApiKeyInput = ({ apiKey, onApiKeyChange }: ApiKeyInputProps) => {
  const [showKey, setShowKey] = useState(false);
  const [tempKey, setTempKey] = useState(apiKey);

  console.log('ApiKeyInput rendered with apiKey length:', apiKey.length);

  const handleSave = () => {
    console.log('Saving API key');
    onApiKeyChange(tempKey);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Key className="w-4 h-4 text-ai-blue-600" />
        <h3 className="font-semibold text-gray-800">OpenAI API Key</h3>
      </div>
      
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type={showKey ? 'text' : 'password'}
            placeholder="sk-..."
            value={tempKey}
            onChange={(e) => setTempKey(e.target.value)}
            className="pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
            onClick={() => setShowKey(!showKey)}
          >
            {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        </div>
        
        <Button 
          onClick={handleSave}
          className="bg-ai-blue-600 hover:bg-ai-blue-700"
          disabled={!tempKey.trim()}
        >
          Save
        </Button>
      </div>
      
      <p className="text-xs text-gray-500 mt-2">
        Your API key is stored locally and never sent to our servers.
      </p>
    </div>
  );
};

export default ApiKeyInput;