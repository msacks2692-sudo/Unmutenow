-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Only authenticated users can view submissions" ON contact_submissions;

-- Create admin-only access policy
CREATE POLICY "Only admins can view contact submissions"
  ON contact_submissions
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));