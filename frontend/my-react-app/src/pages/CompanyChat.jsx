import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import CompanyLayout from '../components/CompanyLayout.jsx';
import { companySendMessage } from '../api.js';
import { Input, Button } from '@mui/joy';
import MessagesList from '../components/MessagesList.jsx';

const CompanyChat = () => {
  const { companyId } = useParams();
  const [searchParams] = useSearchParams();
  const [text, setText] = useState('');

  // Mutation to send a message
  const sendMessageMutation = useMutation({
    async mutationFn() {
      const res = await companySendMessage({
        text,
        receiverId: Number(companyId),
      });

      return res.data;
    },
    onSuccess: () => {
      setText(''); // Clear input after successful submission
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== '') {
      sendMessageMutation.mutate();
    }
  };

  return (
    <CompanyLayout>
      <div className="flex-1 p-4">
        <MessagesList
          companyId={Number(companyId)}
          companyName={searchParams.get('companyName')}
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-md flex items-center space-x-4"
      >
        <Input
          className="flex-1"
          placeholder="Type your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="solid"
          color="primary"
          loading={sendMessageMutation.isPending}
          disabled={sendMessageMutation.isPending}
        >
          Send
        </Button>
      </form>
    </CompanyLayout>
  );
};

export default CompanyChat;
