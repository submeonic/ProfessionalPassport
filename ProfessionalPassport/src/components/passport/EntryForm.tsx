import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { X, Save, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { EntryFormProps, PassportSection } from "./types";

export function EntryForm({ section, entry, mode, onSave, onCancel, onDelete }: EntryFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});

  useEffect(() => {
    if (entry) {
      setFormData(entry as any);
    } else {
      setFormData(getDefaultFormData(section));
    }
  }, [entry, section]);

  const getDefaultFormData = (section: PassportSection): Record<string, string> => {
    const defaults: Record<PassportSection, Record<string, string>> = {
      education: {
        id: `edu-${Date.now()}`,
        institution: "",
        degree: "",
        field: "",
        startDate: "",
        endDate: "",
        description: "",
      },
      experience: {
        id: `exp-${Date.now()}`,
        company: "",
        position: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      },
      projects: {
        id: `proj-${Date.now()}`,
        title: "",
        role: "",
        technologies: "",
        startDate: "",
        endDate: "",
        description: "",
        url: "",
      },
      awards: {
        id: `award-${Date.now()}`,
        title: "",
        issuer: "",
        date: "",
        description: "",
      },
    };
    return defaults[section];
  };

  const getFormFields = (section: PassportSection) => {
    const fieldConfigs: Record<PassportSection, Array<{ name: string; label: string; type: string; required: boolean }>> = {
      education: [
        { name: "institution", label: "Institution", type: "text", required: true },
        { name: "degree", label: "Degree", type: "text", required: true },
        { name: "field", label: "Field of Study", type: "text", required: true },
        { name: "startDate", label: "Start Date", type: "month", required: true },
        { name: "endDate", label: "End Date", type: "text", required: true },
        { name: "description", label: "Description", type: "textarea", required: false },
      ],
      experience: [
        { name: "company", label: "Company", type: "text", required: true },
        { name: "position", label: "Position", type: "text", required: true },
        { name: "location", label: "Location", type: "text", required: true },
        { name: "startDate", label: "Start Date", type: "month", required: true },
        { name: "endDate", label: "End Date (or 'Present')", type: "text", required: true },
        { name: "description", label: "Description", type: "textarea", required: false },
      ],
      projects: [
        { name: "title", label: "Project Title", type: "text", required: true },
        { name: "role", label: "Your Role", type: "text", required: true },
        { name: "technologies", label: "Technologies", type: "text", required: true },
        { name: "startDate", label: "Start Date", type: "month", required: true },
        { name: "endDate", label: "End Date (or 'Present')", type: "text", required: true },
        { name: "url", label: "Project URL", type: "url", required: false },
        { name: "description", label: "Description", type: "textarea", required: false },
      ],
      awards: [
        { name: "title", label: "Award Title", type: "text", required: true },
        { name: "issuer", label: "Issuer", type: "text", required: true },
        { name: "date", label: "Date", type: "month", required: true },
        { name: "description", label: "Description", type: "textarea", required: false },
      ],
    };
    return fieldConfigs[section];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const fields = getFormFields(section);
    const requiredFields = fields.filter(f => f.required);
    const isValid = requiredFields.every(f => formData[f.name]?.trim());
    
    if (!isValid) {
      return;
    }
    
    onSave(formData as any);
  };

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const sectionTitles: Record<PassportSection, string> = {
    education: "Education",
    experience: "Work Experience",
    projects: "Project",
    awards: "Award",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgb(0, 0, 0)" }}
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-xl border"
        style={{
          backgroundColor: "var(--onyx-gradient-start)",
          borderColor: "var(--border)",
          boxShadow: "rgba(0, 181, 216, 0.3) 0px 0px 40px",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-6 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <h2 style={{ color: "var(--soft-ivory)" }}>
            {mode === "add" ? "Add" : "Edit"} {sectionTitles[section]}
          </h2>
          <Button
            size="sm"
            variant="ghost"
            onClick={onCancel}
            className="h-8 w-8 p-0"
            style={{ color: "var(--warm-nickel)" }}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="p-6 space-y-4">
            {getFormFields(section).map((field) => (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name} style={{ color: "var(--soft-ivory)" }}>
                  {field.label} {field.required && <span style={{ color: "var(--vermilion)" }}>*</span>}
                </Label>
                {field.type === "textarea" ? (
                  <Textarea
                    id={field.name}
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    rows={3}
                    className="border-0 focus-visible:ring-1"
                    style={{
                      backgroundColor: "var(--graphite-brushed)",
                      color: "var(--soft-ivory)",
                      borderColor: "var(--border)",
                    }}
                  />
                ) : (
                  <Input
                    id={field.name}
                    type={field.type}
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    required={field.required}
                    className="border-0 focus-visible:ring-1"
                    style={{
                      backgroundColor: "var(--graphite-brushed)",
                      color: "var(--soft-ivory)",
                      borderColor: "var(--border)",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </form>

        {/* Footer */}
        <div
          className="flex items-center justify-between p-6 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <div>
            {mode === "edit" && onDelete && (
              <Button
                type="button"
                variant="ghost"
                onClick={onDelete}
                className="gap-2"
                style={{ color: "var(--vermilion)" }}
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            )}
          </div>
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              style={{
                borderColor: "var(--border)",
                color: "var(--warm-nickel)",
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              className="gap-2"
              style={{
                backgroundColor: "var(--electric-cyan)",
                color: "var(--onyx-gradient-start)",
              }}
            >
              <Save className="h-4 w-4" />
              Save
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
