'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateNoteForm({ userId }: { userId: number }) {
  const [textContent, setTextContent] = useState('');
  const [title, setTitle] = useState('');

  const router = useRouter();

  async function handleCreateNote() {
    await fetch('/api/notes', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        title,
        textContent,
      }),
    });
    router.refresh();
    setTextContent('');
    setTitle('');
  }

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await handleCreateNote();
      }}
    >
      <label>
        Title:
        <input
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
        />
      </label>
      <label>
        Note:
        <input
          value={textContent}
          onChange={(event) => setTextContent(event.currentTarget.value)}
        />
      </label>
      <button>Create +</button>
    </form>
  );
}
