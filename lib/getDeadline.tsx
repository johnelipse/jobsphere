export function calculateJobDeadline(job: { deadline?: string | Date }) {
  if (!job.deadline) {
    return {
      ...job,
      daysRemaining: null,
      isExpired: false,
    };
  }

  const deadlineDate = new Date(job.deadline);
  const now = new Date();

  const differenceMs = deadlineDate.getTime() - now.getTime();
  const daysRemaining = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

  return {
    data: {
      ...job,
      daysRemaining,
      isExpired: daysRemaining < 0,
    },
  };
}
