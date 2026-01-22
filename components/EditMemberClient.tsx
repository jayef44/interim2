'use client';

import MemberForm from '@/components/MemberForm';

interface EditMemberClientProps {
  member: {
    member_id: number;
    first_name: string;
    last_name: string;
    contact_number: string;
    join_date: string;
  };
}

export default function EditMemberClient({ member }: EditMemberClientProps) {
  const handleSubmit = async (data: any) => {
    // Note the change in API endpoint to /api/members/
    const res = await fetch(`/api/members/${member.member_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to update member profile');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <MemberForm 
          initialData={member} 
          onSubmit={handleSubmit} 
          isEditing 
        />
      </div>
    </div>
  );
}