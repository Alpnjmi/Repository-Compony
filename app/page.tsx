import { ShellHeader } from "@/components/shell-header"
import { Button } from "@/components/ui/button"
import { ArrowRight, History, Users, Code, GitBranch, GitMerge } from "lucide-react"
import Link from "next/link"
import { RepositoryDiagram } from "@/components/repository-diagram"
import { BranchingVisualization } from "@/components/branching-visualization"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <ShellHeader />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-shell-red to-shell-darkred text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">Roslem Hub Repository</h1>
              <p className="text-xl opacity-90">
                A centralized storage system for all your project files and resources.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="bg-shell-yellow hover:bg-shell-yellow/90 text-black font-medium">
                  <Link href="/repository">
                    Browse Repository
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-md flex justify-center items-center">
                <div className="bg-white rounded-lg shadow-xl p-8">
                  <img src="/images/shell-logo.png" alt="Shell logo" className="w-full max-w-xs mx-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is a Repository Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-shell-gray">What is a Repository?</h2>
            <p className="text-lg text-muted-foreground">
              A repository (or repo) is a type of centrally located storage where you can keep all your project's files
              and resources.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 md:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-2/3">
                <p className="text-lg leading-relaxed mb-6">
                  Any of the project's stakeholders or developers can pull your repository's code (or resource) for new
                  feature delivery or bug fixes in the product or software application. You can think about the
                  repository as a folder created on the cloud. The folder contains a set of programming files that
                  collectively make an application.
                </p>
                <p className="text-lg leading-relaxed">
                  Repositories have many features like adding, deleting or modifying files. Other key features include
                  versioning, information about who created and updated the files, and at what time they were created.
                  All of these features make repositories easy to work with and contribute to the repository in order to
                  build high-quality products.
                </p>
              </div>
              <div className="md:w-1/3">
                <RepositoryDiagram />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-shell-gray">Key Repository Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-shell-red/10 rounded-full flex items-center justify-center mb-4">
                <History className="h-8 w-8 text-shell-red" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Version Control</h3>
              <p className="text-muted-foreground">
                Track changes over time and revert to previous versions when needed. See the complete history of your
                files.
              </p>
              <div className="mt-6 w-full">
                <img
                  src="/images/version-control.png"
                  alt="Version control visualization"
                  className="w-full rounded-md"
                />
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-shell-yellow/20 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-shell-yellow" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Collaboration</h3>
              <p className="text-muted-foreground">
                Multiple team members can work on the same project simultaneously, with tools to manage and merge
                changes.
              </p>
              <div className="mt-6 w-full">
                <img src="/images/collaboration.png" alt="Collaboration visualization" className="w-full rounded-md" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-shell-blue/10 rounded-full flex items-center justify-center mb-4">
                <Code className="h-8 w-8 text-shell-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">File Management</h3>
              <p className="text-muted-foreground">
                Add, modify, and delete files with ease. Organize your project structure efficiently.
              </p>
              <div className="mt-6 w-full">
                <img
                  src="/images/file-management.png"
                  alt="File management visualization"
                  className="w-full rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-shell-gray">How Repositories Work</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <RepositoryDiagram />
            </div>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-shell-red rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Create or Clone</h3>
                  <p className="text-muted-foreground">
                    Start by creating a new repository or cloning an existing one to your local machine.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-shell-red rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Make Changes</h3>
                  <p className="text-muted-foreground">
                    Add, modify, or delete files in your repository as needed for your project.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-shell-red rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Commit Changes</h3>
                  <p className="text-muted-foreground">
                    Save your changes with descriptive messages to track what was modified and why.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-shell-red rounded-full flex items-center justify-center text-white font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Push and Share</h3>
                  <p className="text-muted-foreground">
                    Upload your changes to the central repository where others can access them.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-shell-gray">Advanced Repository Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-shell-red/10 rounded-lg flex items-center justify-center">
                <GitBranch className="h-6 w-6 text-shell-red" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Branching</h3>
                <p className="text-muted-foreground mb-4">
                  Create separate lines of development to work on features or fixes without affecting the main codebase.
                </p>
                <BranchingVisualization />
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-shell-yellow/20 rounded-lg flex items-center justify-center">
                <GitMerge className="h-6 w-6 text-shell-yellow" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Merging</h3>
                <p className="text-muted-foreground mb-4">
                  Combine changes from different branches to integrate new features or fixes into the main codebase.
                </p>
                <img src="/images/merging.png" alt="Merging visualization" className="w-full rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-shell-red text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Access Roslem Hub's document repository system to store, manage, and collaborate on your project files.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              asChild
              className="bg-shell-yellow hover:bg-shell-yellow/90 text-black font-medium text-lg px-8 py-6 h-auto"
            >
              <Link href="/repository">
                Go to Repository
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild className="bg-white hover:bg-gray-100 text-shell-red font-medium text-lg px-8 py-6 h-auto">
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-shell-gray text-white py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="h-8 w-8">
                <img src="/images/shell-logo.png" alt="Roslem Hub logo" className="h-full w-full object-contain" />
              </div>
              <span className="text-white font-bold">Roslem Hub Repository</span>
            </div>
            <div className="flex items-center gap-4">
              <Button asChild variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                <a href="/contact">Contact Us</a>
              </Button>
              <div className="text-sm text-gray-300">© {new Date().getFullYear()} Roslem Hub. All rights reserved.</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
