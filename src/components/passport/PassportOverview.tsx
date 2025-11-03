import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { SectionCard } from "./SectionCard";
import { EntryForm } from "./EntryForm";
import { PassportData, PassportSection, PassportEntry } from "./types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { toast } from "sonner@2.0.3";

interface PassportOverviewProps {
  userName: string;
  initialData: PassportData;
  onBack: () => void;
  onDataChange: (data: PassportData) => void;
}

export function PassportOverview({ userName, initialData, onBack, onDataChange }: PassportOverviewProps) {
  const [passportData, setPassportData] = useState<PassportData>(initialData);
  const [editingSection, setEditingSection] = useState<PassportSection | null>(null);
  const [editingEntry, setEditingEntry] = useState<PassportEntry | null>(null);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState<{ section: PassportSection; id: string } | null>(null);

  const handleAddNew = (section: PassportSection) => {
    setEditingSection(section);
    setEditingEntry(null);
    setFormMode("add");
  };

  const handleEditEntry = (section: PassportSection, entry: PassportEntry) => {
    setEditingSection(section);
    setEditingEntry(entry);
    setFormMode("edit");
  };

  const handleSave = (section: PassportSection, data: PassportEntry) => {
    const newData = { ...passportData };
    
    if (formMode === "add") {
      newData[section] = [...newData[section], data];
      toast.success("Entry added successfully");
    } else {
      const index = newData[section].findIndex((e: PassportEntry) => e.id === data.id);
      if (index !== -1) {
        newData[section][index] = data;
        toast.success("Changes saved successfully");
      }
    }
    
    setPassportData(newData);
    onDataChange(newData);
    setEditingSection(null);
    setEditingEntry(null);
  };

  const handleDeleteClick = (section: PassportSection, entryId: string) => {
    setEntryToDelete({ section, id: entryId });
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!entryToDelete) return;

    const newData = { ...passportData };
    newData[entryToDelete.section] = newData[entryToDelete.section].filter(
      (e: PassportEntry) => e.id !== entryToDelete.id
    );
    
    setPassportData(newData);
    onDataChange(newData);
    setDeleteDialogOpen(false);
    setEntryToDelete(null);
    
    // Also close form if we're deleting from within the form
    if (editingEntry && editingEntry.id === entryToDelete.id) {
      setEditingSection(null);
      setEditingEntry(null);
    }
    
    toast.success("Entry deleted");
  };

  const handleDeleteFromForm = () => {
    if (editingSection && editingEntry) {
      handleDeleteClick(editingSection, editingEntry.id);
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, var(--onyx-gradient-start) 0%, var(--onyx-gradient-end) 100%)",
      }}
    >
      {/* Header */}
      <div
        className="sticky top-0 z-10 border-b"
        style={{
          backgroundColor: "rgb(27, 27, 27)",
          borderColor: "var(--border)",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={onBack}
            className="gap-2"
            style={{ color: "var(--electric-cyan)" }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
          <h2 style={{ color: "var(--soft-ivory)" }}>My Passport</h2>
          <div className="w-32" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="mb-2" style={{ color: "var(--soft-ivory)" }}>
            {userName}'s Professional Passport
          </h1>
          <p style={{ color: "var(--body-text)" }}>
            Build and manage your professional profile
          </p>
        </motion.div>

        {/* Section Cards Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <SectionCard
              section="education"
              entries={passportData.education}
              onAddNew={() => handleAddNew("education")}
              onEditEntry={(entry) => handleEditEntry("education", entry)}
              onDeleteEntry={(id) => handleDeleteClick("education", id)}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <SectionCard
              section="experience"
              entries={passportData.experience}
              onAddNew={() => handleAddNew("experience")}
              onEditEntry={(entry) => handleEditEntry("experience", entry)}
              onDeleteEntry={(id) => handleDeleteClick("experience", id)}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <SectionCard
              section="projects"
              entries={passportData.projects}
              onAddNew={() => handleAddNew("projects")}
              onEditEntry={(entry) => handleEditEntry("projects", entry)}
              onDeleteEntry={(id) => handleDeleteClick("projects", id)}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <SectionCard
              section="awards"
              entries={passportData.awards}
              onAddNew={() => handleAddNew("awards")}
              onEditEntry={(entry) => handleEditEntry("awards", entry)}
              onDeleteEntry={(id) => handleDeleteClick("awards", id)}
            />
          </motion.div>
        </div>
      </div>

      {/* Entry Form Modal */}
      <AnimatePresence>
        {editingSection && (
          <EntryForm
            section={editingSection}
            entry={editingEntry || undefined}
            mode={formMode}
            onSave={(data) => handleSave(editingSection, data)}
            onCancel={() => {
              setEditingSection(null);
              setEditingEntry(null);
            }}
            onDelete={formMode === "edit" ? handleDeleteFromForm : undefined}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent
          style={{
            backgroundColor: "var(--onyx-gradient-start)",
            borderColor: "var(--border)",
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle style={{ color: "var(--soft-ivory)" }}>
              Delete this entry?
            </AlertDialogTitle>
            <AlertDialogDescription style={{ color: "var(--body-text)" }}>
              This action cannot be undone. This will permanently delete the entry from your passport.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              style={{
                backgroundColor: "var(--graphite-brushed)",
                borderColor: "var(--border)",
                color: "var(--warm-nickel)",
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              style={{
                backgroundColor: "var(--vermilion)",
                color: "var(--soft-ivory)",
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
