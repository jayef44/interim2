import { supabase } from '@/lib/supabaseClient';
import EditStudentClient from '@/components/EditMemberClient';
import { notFound } from 'next/navigation';

export default async function EditStudentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    notFound();
  }

  const student = {
    id: data.id,
    studentId: data.student_id,
    firstName: data.first_name,
    lastName: data.last_name,
    course: data.course,
    yearLevel: data.year_level,
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Edit Student</h1>
      <EditStudentClient student={student} />
    </div>
  );
}
