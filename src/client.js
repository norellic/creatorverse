import { createClient} from '@supabase/supabase-js'
import { supabase } from '../../web102_unit7lab/src/client';

const URL = "https://xiehlaqlcryjtlzohxdf.supabase.co"; 
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpZWhsYXFsY3J5anRsem9oeGRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyNzc5MTksImV4cCI6MjA2OTg1MzkxOX0.tsCk8JXsIVTHRd0QZHqvR_R1TtWL6UiDsqML2gdtiRw";

export const lockedOutSupabase = createClient(URL, API_KEY);
