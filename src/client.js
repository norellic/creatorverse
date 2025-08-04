import { createClient} from '@supabase/supabase-js'
import { supabase } from '../../web102_unit7lab/src/client';

const URL = "https://afcvhtnzwkaxhvzgogvh.supabase.co";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmY3ZodG56d2theGh2emdvZ3ZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzMTI3OTksImV4cCI6MjA2ODg4ODc5OX0.AFE-rO9a_VWbTPKS5qFkg34jBKBOV6nGw0uWo1mgwQc";

export const supabase = createClient(URL, API_KEY);
