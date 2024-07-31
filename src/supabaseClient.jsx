import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ruxegubfleaphadbqgaz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1eGVndWJmbGVhcGhhZGJxZ2F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA3ODg3MDgsImV4cCI6MjAzNjM2NDcwOH0.15e7CMQfLQsD4LM43ukjz46kZvDVkEy47JpyLPgeHKM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
