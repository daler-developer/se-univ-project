import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { companyGetMessages, pinMessage, unpinMessage } from '../api.js';
import CompanyLayout from './CompanyLayout.jsx';
import { FaThumbtack } from 'react-icons/fa';
import { IconButton } from '@mui/joy';

const MessagesList = ({ companyId, companyName }) => {
  const queryClient = useQueryClient();

  // Fetch messages using useQuery (TanStack Query v6)
  const { data, isLoading } = useQuery({
    queryKey: ['messages', companyId],
    queryFn: async () => {
      const res = await companyGetMessages(companyId);
      return res.data;
    },
    refetchInterval: 1000,
  });

  // Mutation to pin a message
  const pinMessageMutation = useMutation({
    async mutationFn({ messageId }) {
      const res = await pinMessage(messageId);

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['messages', companyId]);
    },
  });

  const unpinMessageMutation = useMutation({
    async mutationFn({ messageId }) {
      const res = await unpinMessage(messageId);

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['messages', companyId]);
    },
  });

  const handlePinMessage = (messageId) => {
    pinMessageMutation.mutate({ messageId });
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen pb-[200px]">
      <h4 className="mb-6 text-center font-bold text-teal-600 text-2xl">
        {companyName}
      </h4>
      <div className="flex flex-col space-y-4">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex justify-center">
                <div className="w-full max-w-md p-4 shadow-lg bg-gray-200 rounded-lg animate-pulse">
                  <p className="text-gray-500">Loading message...</p>
                </div>
              </div>
            ))
          : data?.map((message) => (
              <div
                key={message.messageId}
                className={`flex ${message.sender.id === companyId ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`relative flex items-center space-x-4 p-4 shadow-lg max-w-md rounded-xl ${
                    message.sender.id === companyId
                      ? 'bg-blue-500 text-white'
                      : 'bg-white'
                  }`}
                >
                  {message.sender.id !== companyId && (
                    <img
                      src={message.sender.profilePicture}
                      alt={message.sender.email}
                      className="w-12 h-12 rounded-full border-2 border-gray-300"
                    />
                  )}
                  <div className="flex flex-col flex-1">
                    <p className="font-semibold text-lg mb-1 flex items-center">
                      {message.sender.email}
                      {message.isPinned && (
                        <FaThumbtack className="ml-2 text-yellow-500" />
                      )}
                    </p>
                    <p className="text-md">{message.text}</p>
                    <p className="text-sm text-gray-400 mt-1">
                      {new Date(message.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <IconButton
                    size="sm"
                    variant="plain"
                    color="warning"
                    onClick={() => {
                      if (message.isPinned) {
                        unpinMessageMutation.mutate({
                          messageId: message.messageId,
                        });
                      } else {
                        handlePinMessage(message.messageId);
                      }
                    }}
                    className="self-start"
                  >
                    <FaThumbtack />
                  </IconButton>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default MessagesList;
