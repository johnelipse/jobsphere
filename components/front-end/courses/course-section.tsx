import { SectionHeader } from "../section-header";
import { CourseCard } from "./course-card";

interface Course {
  id: number;
  title: string;
  image: string;
  rating: number;
  students: number;
}

interface CourseSectionProps {
  title: string;
  courses: Course[];
}

export function CourseSection({ title, courses }: CourseSectionProps) {
  return (
    <div className="mb-8">
      <SectionHeader title={title} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            title={course.title}
            image={course.image}
            rating={course.rating}
            students={course.students}
          />
        ))}
      </div>
    </div>
  );
}
