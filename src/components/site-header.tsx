import HelpDialog from "./help-dialog";

export function SiteHeader() {
  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear max-w-[1536px] mx-auto">
      <div className="flex w-full items-center justify-between gap-1 px-4 lg:gap-2 lg:px-6">
        <h1 className="text-xl font-medium">Job Snap</h1>
        <div>
          <HelpDialog />
        </div>
      </div>
    </header>
  );
}
