<script lang="ts">
  type Step = {
    name: string;
    description: string;
  };

  let { steps, currentStep }: { steps: Step[]; currentStep: number } = $props();
</script>

<nav aria-label="Progress">
  <ol role="list" class="grid grid-cols-3">
    {#each steps as step, stepIdx}
      <li class="relative">
        <div class="flex flex-col items-center">
          <!-- Circle and connecting line -->
          <div class="relative">
            <!-- Connecting line (draws from center of this step to the next) -->
            {#if stepIdx < steps.length - 1}
              <div
                class="absolute left-4 top-1/2 h-0.5 w-full -translate-y-1/2"
                class:bg-primary-600={stepIdx < currentStep}
                class:bg-gray-200={stepIdx >= currentStep}
                aria-hidden="true"
              ></div>
            {/if}

            {#if stepIdx < currentStep}
              <!-- Completed Step -->
              <div
                class="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary-600"
              >
                <svg
                  class="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            {:else if stepIdx === currentStep}
              <!-- Current Step -->
              <div
                class="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary-600 bg-white"
                aria-current="step"
              >
                <span
                  class="h-2.5 w-2.5 rounded-full bg-primary-600"
                  aria-hidden="true"
                ></span>
              </div>
            {:else}
              <!-- Upcoming Step -->
              <div
                class="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white"
              >
                <span
                  class="h-2.5 w-2.5 rounded-full bg-transparent"
                  aria-hidden="true"
                ></span>
              </div>
            {/if}
          </div>

          <!-- Label -->
          <div class="mt-3 text-center">
            <p
              class="text-sm font-medium {stepIdx <= currentStep
                ? 'text-primary-600'
                : 'text-gray-500'}"
            >
              {step.name}
            </p>
          </div>
        </div>
      </li>
    {/each}
  </ol>
</nav>
