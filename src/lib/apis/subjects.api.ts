export const getSubjects = async () => {
    try {
      const res = await fetch("/api/subjects", {
        method: "GET",
        headers: {
          
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      return(data)

    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };