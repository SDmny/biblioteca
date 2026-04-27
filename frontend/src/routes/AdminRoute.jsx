import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../utils/supabase"; 

function AdminRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error || !user) {
        setAuthorized(false);
        setLoading(false);
        return;
      }

      const { data: userData, error: dbError } = await supabase
        .from("user")
        .select("role") 
        .eq("email", user.email)
        .single();

      if (dbError || !userData) {
        setAuthorized(false);
      } else {
        const role = userData.role?.toLowerCase().trim();
        setAuthorized(role === "admin" || role === "administrador");
      }
      
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Verificando permisos...</div>;
  }

  if (!authorized) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default AdminRoute;