import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Notes = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // for loading state
    const [error, setError] = useState(null); // for error handling

    // Fetch notes from the server
    const fetchApi = async () => {
        try {
            const res = await fetch("http://localhost:9000/Add");
            if (res.ok) {
                const result = await res.json();
                setData(result.user);
            } else {
                setError("Failed to fetch notes");
            }
        } catch (err) {
            setError("An error occurred while fetching notes");
        } finally {
            setLoading(false);
        }
    };

  
    const deleteNotes = async (userid) => {
        try {
            const res = await fetch(`http://localhost:9000/delete/${userid}`, {
                method: "DELETE",
            });

            if (res.ok) {
                // Update the local state to reflect the deleted note
                setData(data.filter(note => note.userid !== userid));
            } else {
                console.error("Failed to delete note");
            }
        } catch (err) {
            console.error("Error deleting note:", err);
        }
    };


   

    // Fetch notes when the component is mounted
    useEffect(() => {
        fetchApi();
    }, []);

    // Display loading state or error message if any
    if (loading) {
        return <div className="text-center text-xl font-semibold text-gray-700">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-xl font-semibold text-red-600">{error}</div>;
    }

    return (
        <div className="container mx-auto p-5">
            <h1 className="text-center text-3xl font-semibold text-gray-800 mb-8">My Notes</h1>

            {data.length === 0 ? (
                <div className="text-center text-lg text-gray-500">No notes available.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {data.map((Note, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">{Note.Title}</h2>
                                <p className="text-gray-600 mb-4">{Note.Message}</p>
                                <p className="text-gray-600 mb-4">{Note.file_name}</p>
                                <Link to={`/update/${Note.userid}`}>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 m-4 rounded-md hover:bg-red-600 transition duration-300"
                                    
                                >
                                    Update
                                </button>
                                </Link>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                                    onClick={() => deleteNotes(Note.userid)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Notes;
