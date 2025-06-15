import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

// import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import IdeaList from "../components/IdeaList";
import AddIdeaForm from "../components/AddIdeaForm";
import TeacherGrid from "../components/TeacherGrid";

function Request() {
  const [ideas, setIdeas] = useState([]);
  const [newIdea, setNewIdea] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    axios
      .get("https://684e4cb3f0c9c9848d27c816.mockapi.io/teachers")
      .then((res) => setTeachers(res.data));

    axios
      .get("https://68219a0e259dad2655afc1ba.mockapi.io/project/ideas")
      .then((res) =>
        setIdeas(res.data.filter((idea) => idea.status === "Approved"))
      );
  }, []);

  const handleAddIdea = (e) => {
    e.preventDefault();
    const newIdeaData = { idea: newIdea, status: "Pending" };
    axios
      .post(
        "https://68219a0e259dad2655afc1ba.mockapi.io/project/ideas",
        newIdeaData
      )
      .then(() => {
        Swal.fire(
          "Success!",
          "Your idea has been added successfully!",
          "success"
        );
        setNewIdea("");
      });
  };

  const filteredIdeas = ideas.filter((idea) =>
    idea.idea.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="min-h-screen bg-[#1B2534] flex justify-center items-start p-10 font-sans"
      style={{
        backgroundAttachment: "fixed",
        backgroundBlendMode: "multiply",
      }}
    >
      <div className="max-w-7xl w-full grid grid-cols-12 gap-8">
        <aside
          className="col-span-3 bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 sticky top-10 h-fit max-h-[calc(100vh-80px)] overflow-y-auto border border-white/20"
          style={{
            WebkitBackdropFilter: "blur(15px)",
            backdropFilter: "blur(15px)",
          }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/30 pb-2 select-none">
            Teachers
          </h2>
          <div className="space-y-3">
            {teachers.map((teacher) => (
              <div
                key={teacher.id}
                className="p-3 bg-white/20 rounded-md shadow-sm hover:shadow-md cursor-pointer transition-shadow duration-300 truncate text-white"
                title={teacher.name}
              >
                {teacher.name}
              </div>
            ))}
          </div>
        </aside>

        <main
          className="col-span-9 bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-8 flex flex-col space-y-8 border border-white/20"
          style={{
            WebkitBackdropFilter: "blur(15px)",
            backdropFilter: "blur(15px)",
          }}
        >
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            className="bg-white/20 text-white placeholder-white/70"
          />

          <section className="overflow-y-auto max-h-[350px] rounded-lg p-4 bg-white/10 shadow-inner border border-white/20 text-white">
            <IdeaList ideas={filteredIdeas} />
          </section>

          <section className="rounded-lg p-6 shadow-inner bg-white/10 border border-white/20">
            <AddIdeaForm
              newIdea={newIdea}
              setNewIdea={setNewIdea}
              handleAddIdea={handleAddIdea}
            />
          </section>
        </main>
      </div>
    </div>
  );
}

export default Request;
