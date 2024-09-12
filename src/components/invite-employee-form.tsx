"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { inviteEmployee } from '@/lib/actions/actions.invites';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { FiSend } from 'react-icons/fi';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const inviteSchema = z.object({
  email: z.string().email('Invalid email address'),
  role: z.string().min(1, 'Role is required'),
});

type InviteFormData = z.infer<typeof inviteSchema>;

export default function InviteEmployeeForm({ companyId }: { companyId: string }) {
  const [message, setMessage] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<InviteFormData>({
    resolver: zodResolver(inviteSchema),
  });

  const onSubmit = async (data: InviteFormData) => {
    try {
      await inviteEmployee(data.email, data.role, companyId);
      setMessage('Invitation sent successfully!');
    } catch (error) {
        console.log(error);
      setMessage('Failed to send invitation. Please try again.');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
          Invite New Employee
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="email">Employee Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="employee@example.com"
              {...register('email')}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <Select onValueChange={(value) => setValue('role', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="employee">Employee</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
          </div>
          <Button type="submit" className="w-full">
            <FiSend className="mr-2 h-4 w-4" />
            Send Onboarding Invitation
          </Button>
        </form>
        {message && <p className="mt-4 text-center">{message}</p>}
      </CardContent>
    </Card>
  );
}