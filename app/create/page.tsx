'use client';

import StudentForm from '@/components/MemberForm';

export default function CreateStudentPage() {
  const handleSubmit = async (data: any) => {
    const res = await fetch('/api/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to create student');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Add New Student</h1>
      <StudentForm onSubmit={handleSubmit} />
    </div>
  );
}
