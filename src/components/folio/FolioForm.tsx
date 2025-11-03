import { useState } from "react";
import { motion } from "motion/react";
import { X, Save, Plus, Minus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Slider } from "../ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FolioFormData } from "./types";
import { availableSkills, departments } from "./mockData";

interface FolioFormProps {
  onSave: (data: FolioFormData) => void;
  onCancel: () => void;
}

export function FolioForm({ onSave, onCancel }: FolioFormProps) {
  const [formData, setFormData] = useState<FolioFormData>({
    roleTitle: "",
    department: "",
    requiredSkills: [],
    experienceRange: [3, 6],
  });
  const [skillSearchQuery, setSkillSearchQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.roleTitle.trim() || !formData.department || formData.requiredSkills.length === 0) {
      return;
    }

    onSave(formData);
  };

  const toggleSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      requiredSkills: prev.requiredSkills.includes(skill)
        ? prev.requiredSkills.filter((s) => s !== skill)
        : [...prev.requiredSkills, skill],
    }));
  };

  const filteredSkills = availableSkills.filter((skill) =>
    skill.toLowerCase().includes(skillSearchQuery.toLowerCase())
  );

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
          boxShadow: "rgba(0, 196, 140, 0.3) 0px 0px 40px",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-6 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <h2 style={{ color: "var(--soft-ivory)" }}>Create New Folio</h2>
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
          <div className="p-6 space-y-6">
            {/* Role Title */}
            <div className="space-y-2">
              <Label htmlFor="roleTitle" style={{ color: "var(--soft-ivory)" }}>
                Role Title <span style={{ color: "var(--vermilion)" }}>*</span>
              </Label>
              <Input
                id="roleTitle"
                value={formData.roleTitle}
                onChange={(e) => setFormData((prev) => ({ ...prev, roleTitle: e.target.value }))}
                placeholder="e.g., Senior Frontend Engineer"
                required
                className="border-0 focus-visible:ring-1"
                style={{
                  backgroundColor: "var(--graphite-brushed)",
                  color: "var(--soft-ivory)",
                }}
              />
            </div>

            {/* Department */}
            <div className="space-y-2">
              <Label htmlFor="department" style={{ color: "var(--soft-ivory)" }}>
                Department <span style={{ color: "var(--vermilion)" }}>*</span>
              </Label>
              <Select value={formData.department} onValueChange={(value) => setFormData((prev) => ({ ...prev, department: value }))}>
                <SelectTrigger
                  className="border-0 focus:ring-1"
                  style={{
                    backgroundColor: "var(--graphite-brushed)",
                    color: formData.department ? "var(--soft-ivory)" : "var(--meta-text)",
                  }}
                >
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent
                  style={{
                    backgroundColor: "var(--graphite-brushed)",
                    borderColor: "var(--border)",
                  }}
                >
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept} style={{ color: "var(--soft-ivory)" }}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Required Skills */}
            <div className="space-y-2">
              <Label style={{ color: "var(--soft-ivory)" }}>
                Required Skills <span style={{ color: "var(--vermilion)" }}>*</span>
              </Label>
              
              {/* Search */}
              <Input
                value={skillSearchQuery}
                onChange={(e) => setSkillSearchQuery(e.target.value)}
                placeholder="Search skills..."
                className="border-0 focus-visible:ring-1 mb-3"
                style={{
                  backgroundColor: "var(--graphite-brushed)",
                  color: "var(--soft-ivory)",
                }}
              />

              {/* Selected Skills */}
              {formData.requiredSkills.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3 p-3 rounded-lg" style={{ backgroundColor: "rgb(13, 49, 42)" }}>
                  {formData.requiredSkills.map((skill) => (
                    <Badge
                      key={skill}
                      className="gap-1.5 cursor-pointer border-0"
                      style={{
                        backgroundColor: "var(--emerald)",
                        color: "var(--onyx-gradient-start)",
                      }}
                      onClick={() => toggleSkill(skill)}
                    >
                      {skill}
                      <Minus className="h-3 w-3" />
                    </Badge>
                  ))}
                </div>
              )}

              {/* Available Skills */}
              <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-3 rounded-lg" style={{ backgroundColor: "rgb(0, 0, 0)" }}>
                {filteredSkills
                  .filter((skill) => !formData.requiredSkills.includes(skill))
                  .map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="gap-1.5 cursor-pointer transition-all hover:scale-105"
                      style={{
                        borderColor: "var(--emerald)",
                        color: "var(--emerald)",
                        backgroundColor: "rgba(0, 196, 140, 0.05)",
                      }}
                      onClick={() => toggleSkill(skill)}
                    >
                      <Plus className="h-3 w-3" />
                      {skill}
                    </Badge>
                  ))}
              </div>
            </div>

            {/* Experience Range */}
            <div className="space-y-3">
              <Label style={{ color: "var(--soft-ivory)" }}>
                Experience Range (years)
              </Label>
              <div className="px-2">
                <Slider
                  value={formData.experienceRange}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, experienceRange: value as [number, number] }))}
                  min={0}
                  max={15}
                  step={1}
                  className="w-full"
                />
              </div>
              <div className="flex justify-between">
                <span
                  style={{
                    color: "var(--emerald)",
                    fontSize: "0.875rem",
                    fontFamily: "'Kode Mono', monospace",
                  }}
                >
                  {formData.experienceRange[0]} years
                </span>
                <span
                  style={{
                    color: "var(--emerald)",
                    fontSize: "0.875rem",
                    fontFamily: "'Kode Mono', monospace",
                  }}
                >
                  {formData.experienceRange[1]} years
                </span>
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div
          className="flex items-center justify-end gap-3 p-6 border-t"
          style={{ borderColor: "var(--border)" }}
        >
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
              backgroundColor: "var(--emerald)",
              color: "var(--onyx-gradient-start)",
            }}
          >
            <Save className="h-4 w-4" />
            Create Folio
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
