import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddNotes = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null); // State to store the selected file

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Set the first selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!title || !message) {
      toast.error("🦄 Title and Message are required!");
      return;
    }

    const formData = new FormData();
    formData.append("Title", title);    // Append Title to the FormData
    formData.append("Message", message); // Append Message to the FormData

   
      formData.append("file", file); // Append the selected file if any
  
    

    try {
      const response = await fetch("http://localhost:9000/Addchat", {
        method: "POST",
        body: formData, 
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("🦄 Note added successfully!");
        setTitle(""); // Clear title input
        setMessage(""); // Clear message input
        setFile(null); // Clear file input
      } else {
        toast.error(`🦄 ${result.error || 'Something went wrong!'}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("🦄 Something went wrong!");
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="flex min-h-full flex-1 flex-col justify-center px-5 py-8 lg:px-8 dark:bg-orange-900">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-7 tracking-tight text-gray-900">
            Add Notes
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Input */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Title
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  autoComplete="text"
                  required
                  className="block w-full border-5 rounded-md py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 md:text-md sm:leading-2"
                />
              </div>
            </div>

            {/* Message Input */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Message
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="message"
                  name="message"
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  autoComplete="current-price"
                  required
                  className="block w-full rounded-lg border-2 py-5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 md:text-lg sm:leading-6"
                />
              </div>
            </div>

            {/* File Input */}
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Upload File (Optional)
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="file"
                  name="file"
                  type="file"
                  onChange={handleFileChange}
                  className="block w-full text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit" // Change onClick to type="submit"
                className="flex w-full justify-center rounded-md bg-slate-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNotes;
