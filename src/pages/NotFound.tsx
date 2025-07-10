import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] pt-20">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4 text-gradient-primary">404</h1>
          <p className="text-2xl text-muted-foreground mb-4">הדף שחיפשת לא נמצא</p>
          <p className="text-lg text-muted-foreground mb-8">יכול להיות שהקישור שגוי או שהדף הוסר</p>
          <Button asChild className="btn-primary">
            <Link to="/">חזור לעמוד הבית</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
