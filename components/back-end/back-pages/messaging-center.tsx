"use client";

import { useState } from "react";
import { Clock, Paperclip, Search, Send, Smile, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const contacts = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AJ",
    lastMessage: "When would be a good time for an interview?",
    time: "10:30 AM",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Sarah Williams",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SW",
    lastMessage: "Thank you for considering my application.",
    time: "Yesterday",
    unread: 0,
    online: true,
  },
  {
    id: 3,
    name: "Michael Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MB",
    lastMessage: "I've attached my portfolio as requested.",
    time: "Yesterday",
    unread: 0,
    online: false,
  },
  {
    id: 4,
    name: "Emily Davis",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "ED",
    lastMessage: "Looking forward to the next steps!",
    time: "Monday",
    unread: 0,
    online: false,
  },
  {
    id: 5,
    name: "David Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "DW",
    lastMessage: "Is the position still available?",
    time: "Monday",
    unread: 0,
    online: false,
  },
];

const messages = [
  {
    id: 1,
    sender: "Alex Johnson",
    content:
      "Hello! I'm very interested in the Senior Developer position at your company.",
    time: "10:15 AM",
    isMe: false,
  },
  {
    id: 2,
    sender: "Me",
    content:
      "Hi Alex, thanks for your interest! I've reviewed your application and I'm impressed with your experience.",
    time: "10:18 AM",
    isMe: true,
  },
  {
    id: 3,
    sender: "Alex Johnson",
    content:
      "That's great to hear! I'm particularly excited about the tech stack you're using.",
    time: "10:20 AM",
    isMe: false,
  },
  {
    id: 4,
    sender: "Me",
    content:
      "Yes, we're using React with Next.js on the frontend and Node.js on the backend. Would you be available for a technical interview next week?",
    time: "10:25 AM",
    isMe: true,
  },
  {
    id: 5,
    sender: "Alex Johnson",
    content:
      "That sounds perfect! I have experience with both technologies. When would be a good time for an interview?",
    time: "10:30 AM",
    isMe: false,
  },
];

export function MessagingCenter() {
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [messageText, setMessageText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In a real app, you would send the message to the backend
      console.log("Sending message:", messageText);
      setMessageText("");
    }
  };

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Messaging Center</h2>
        <p className="text-muted-foreground">
          Chat with candidates about job opportunities.
        </p>
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-0">
          <div className="grid h-[600px] grid-cols-1 md:grid-cols-3">
            {/* Contact List */}
            <div className="border-r border-gray-200 md:col-span-1">
              <div className="p-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search contacts..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <ScrollArea className="h-[520px]">
                <div className="space-y-1 p-2">
                  {filteredContacts.map((contact) => (
                    <button
                      key={contact.id}
                      className={`flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-gray-100 ${
                        selectedContact.id === contact.id ? "bg-gray-100" : ""
                      }`}
                      onClick={() => setSelectedContact(contact)}
                    >
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={contact.avatar}
                            alt={contact.name}
                          />
                          <AvatarFallback>{contact.initials}</AvatarFallback>
                        </Avatar>
                        {contact.online && (
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></span>
                        )}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{contact.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {contact.time}
                          </p>
                        </div>
                        <p className="truncate text-sm text-muted-foreground">
                          {contact.lastMessage}
                        </p>
                      </div>
                      {contact.unread > 0 && (
                        <Badge className="ml-auto bg-blue-600">
                          {contact.unread}
                        </Badge>
                      )}
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Chat Area */}
            <div className="flex flex-col md:col-span-2">
              {/* Chat Header */}
              <div className="flex items-center justify-between border-b border-gray-200 p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={selectedContact.avatar}
                      alt={selectedContact.name}
                    />
                    <AvatarFallback>{selectedContact.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{selectedContact.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {selectedContact.online ? (
                        <span className="flex items-center gap-1">
                          <span className="h-2 w-2 rounded-full bg-green-500"></span>{" "}
                          Online
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> Last seen recently
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div>
                  <Button variant="ghost" size="icon">
                    <User className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.isMe ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.isMe
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p>{message.content}</p>
                        <p
                          className={`text-right text-xs ${
                            message.isMe ? "text-blue-100" : "text-gray-500"
                          }`}
                        >
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="flex-1"
                  />
                  <Button variant="ghost" size="icon">
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Button size="icon" onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
