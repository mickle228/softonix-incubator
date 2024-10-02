<template>
  <div class="flex">
    <div class="sidebar p-6 overflow-y-auto h-[86vh]">
      <div class="border border-[#c3bcbc] p-3 rounded-md">
        <div class="flex justify-between">
          <div class="flex">
            <h1 class="text-sm font-bold">JOB OPENINGS</h1>
            <div><img class="ml-3 shrink" width="18" height="18" src="https://img.icons8.com/color/48/info--v1.png" alt="info--v1"></div>
          </div>
          <button><img width="48" height="48" src="https://img.icons8.com/emoji/48/right-arrow-emoji.png" alt="right-arrow-emoji"></button>
        </div>
        <div>
          <p>Departments:</p>
          <DepartmentSelect
            :selectedDepartments="selectedDepartments"
            :departments="filteredDepartments"
            @update:selectedDepartments="(value) => selectedDepartments = value"
          />
        </div>
        <div class="mb-4">
          <p v-if="selectedDepartments.length > 0">
            Showing {{ filteredJobs.length }} out of {{ totalJobsCount }} job openings
          </p>
          <p v-else>Showing {{ totalJobsCount }} job openings</p>
          <div class="border-b-2 my-2 border-[#c3bcbc]" />
        </div>

        <div v-for="(group, index) in groupedJobs" :key="index" class="mb-6">
          <div class="flex items-center">
            <span class="cursor-pointer" @click="toggleSeeMore(group)">
              <ArrowIcon :isExpanded="group.showMore" />
            </span>
            <h2 class="text-xl font-semibold ml-2">{{ group.name }} ({{ group.jobs.length }})</h2>
          </div>

          <ul v-if="group.showMore">
            <li
              v-for="(job, jobIndex) in group.jobs.slice(0, group.showAll ? group.jobs.length : 5)"
              :key="jobIndex"
              class="job-item flex items-center"
            >
              <span class="job-dot" />
              <a :href="job.url" class="text-blue-600 hover:underline ml-9">{{ job.title }}</a>
            </li>
            <li v-if="group.showMore && group.jobs.length > 5" class="job-item flex items-center">
              <button
                class="text-blue-500 ml-5"
                @click="toggleSeeAll(group)"
              >
                {{ group.showAll ? 'See less' : 'See more' }}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { jobOpenings, type IJobOpening } from '@/_homework/job-openings'
import { departments, type IDepartment } from '@/_homework/departments'
import { type IJobGroup } from './job-openings'

const selectedDepartments = ref<string[]>([])
const jobs = jobOpenings as IJobOpening[]
const departmentsList = departments as IDepartment[]

const filteredDepartments = computed(() => {
  const deptWithJobs = new Set(jobs.flatMap(job => job.departments))
  return departmentsList
    .filter(department => deptWithJobs.has(department.value))
    .sort((a, b) => a.name.localeCompare(b.name))
})

const filteredJobs = computed<IJobOpening[]>(() => {
  if (selectedDepartments.value.length === 0) return jobs
  return jobs.filter(job =>
    job.departments.some(dept => selectedDepartments.value.includes(dept))
  )
})

const groupedJobs = computed<IJobGroup[]>((): IJobGroup[] => {
  return selectedDepartments.value.length === 0
    ? groupJobsByDepartments(filteredJobs.value)
    : groupJobsBySelectedDepartments(filteredJobs.value)
})

function groupJobsByDepartments (jobs: IJobOpening[]): IJobGroup[] {
  const grouped: Record<string, IJobGroup> = {}
  const othersGroup: IJobGroup = reactive({ name: 'Others', jobs: [], showMore: true, showAll: false })

  jobs.forEach((job: IJobOpening) => {
    if (job.departments.length > 0) {
      job.departments.forEach((department: string) => {
        const departmentName = getDepartmentName(department)
        if (departmentName) {
          if (!grouped[department]) {
            grouped[department] = reactive({ name: departmentName, jobs: [], showMore: true, showAll: false })
          }
          grouped[department].jobs.push(job)
        }
      })
    } else {
      othersGroup.jobs.push(job)
    }
  })

  const groupedArray = Object.values(grouped)
    .filter(group => group.jobs.length > 0)
    .sort((a, b) => a.name.localeCompare(b.name))

  if (othersGroup.jobs.length > 0) {
    groupedArray.push(othersGroup)
  }

  return groupedArray
}

function groupJobsBySelectedDepartments (jobs: IJobOpening[]): IJobGroup[] {
  const grouped: Record<string, IJobGroup> = {}

  jobs.forEach((job: IJobOpening) => {
    job.departments.forEach((department: string) => {
      if (selectedDepartments.value.includes(department)) {
        const departmentName = getDepartmentName(department)
        if (departmentName) {
          if (!grouped[department]) {
            grouped[department] = reactive({ name: departmentName, jobs: [], showMore: true, showAll: false })
          }
          grouped[department].jobs.push(job)
        }
      }
    })
  })

  const groupedArray = Object.values(grouped)
    .filter(group => group.jobs.length > 0)
    .sort((a, b) => a.name.localeCompare(b.name))

  return groupedArray
}

const totalJobsCount = computed(() => jobs.length)

function getDepartmentName (departmentValue: string): string | null {
  const department = departmentsList.find(dept => dept.value === departmentValue)
  return department ? department.name : null
}

function toggleSeeMore (group: IJobGroup) {
  group.showMore = !group.showMore
}

function toggleSeeAll (group: IJobGroup) {
  group.showAll = !group.showAll
}
</script>

<style scoped>
.sidebar {
  border: 1px solid #eaeaea;
  background-color: #f9f9f9;
}

.job-item {
  position: relative;
  padding-left: 24px;
}

.job-dot {
  position: absolute;
  left: 45px;
  top: 8px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: green;
}

.job-item::before {
  content: '';
  position: absolute;
  left: 11px;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: lightgray;
}
.job-item::after {
  content: '';
  position: absolute;
  left: 11px;
  top: 12px;
  width: 25px;
  height: 2px;
  background-color: lightgray;
}
</style>
