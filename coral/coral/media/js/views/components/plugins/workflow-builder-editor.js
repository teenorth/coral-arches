define([
  'jquery',
  'knockout',
  'knockout-mapping',
  'arches',
  'templates/views/components/plugins/workflow-builder-editor.htm',
  'viewmodels/workflow-builder-step',
  'viewmodels/workflow-builder-config',
  'plugins/knockout-select2'
], function ($, ko, koMapping, arches, pageTemplate, WorkflowBuilderStep) {
  const pageViewModel = function (params) {
    this.workflowName = ko.observable('New Workflow');
    this.workflowSteps = ko.observableArray();
    this.activeStep = ko.observable();

    this.graphId = ko.observable();

    this.workflowPlugin = ko.observable();

    this.configActive = ko.observable(false);
    this.showWorkflowInSidebar = ko.observable(false);

    this.addStep = (stepData) => {
      const title = stepData?.title || `Step ${this.workflowSteps().length + 1}`;
      const step = new WorkflowBuilderStep({
        title: title,
        cards: stepData?.layoutSections[0].componentConfigs,
        graphId: this.graphId()
      });
      this.workflowSteps().push(step);
      this.workflowSteps.valueHasMutated();
      if (!this.activeStep()) {
        this.activeStep(this.workflowSteps()[0]);
      }
    };

    this.loadSteps = (steps) => {
      steps?.forEach((stepData) => {
        this.addStep(stepData);
      });
    };

    this.switchStep = (stepIdx) => {
      this.setConfigActive(false);
      this.activeStep(this.workflowSteps()[stepIdx]);
    };

    this.setConfigActive = (active) => {
      if (active !== this.configActive()) {
        this.configActive(active);
      }
    };

    this.getWorkflowData = () => {
      return {
        pluginid: this.workflowPluginId(),
        name: this.workflowName(),
        icon: 'fa fa-check',
        component: 'views/components/plugins/workflow-builder-loader',
        componentname: 'workflow-builder-loader',
        config: {
          show: this.showWorkflowInSidebar(),
          stepData: this.workflowSteps().map((step) => step.getStepData())
        },
        slug: 'my-custom-workflow',
        sortorder: 0
      };
    };

    this.registerWorkflow = async () => {
      const data = this.getWorkflowData();
      const workflowPlugin = await $.ajax({
        type: 'POST',
        url: '/workflow-builder/register',
        dataType: 'json',
        data: JSON.stringify(data),
        context: this
      });
      this.workflowPlugin(workflowPlugin);
    };

    this.exportWorkflow = async () => {
      await this.updateWorkflow();
      if (this.workflowSlug()) {
        var downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute(
          'href',
          arches.urls.root + `workflow-builder/export?slug=${this.workflowSlug()}`
        );
        downloadAnchorNode.setAttribute('download', `${this.workflowSlug()}.json`);
        document.body.appendChild(downloadAnchorNode); // Required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
      }
    };

    this.updateWorkflow = async () => {
      const data = this.getWorkflowData();
      const workflowPlugin = await $.ajax({
        type: 'PUT',
        url: '/workflow-builder/update',
        dataType: 'json',
        data: JSON.stringify(data),
        context: this,
        error: (response, status, error) => {
          console.log(response, status, error);
        }
      });
      this.workflowPlugin(workflowPlugin);
    };

    this.workflowSlug = ko.computed(() => {
      if (this.workflowPlugin()?.slug) {
        return this.workflowPlugin()?.slug;
      }
      const searchParams = new URLSearchParams(window.location.search);
      const workflowSlug = searchParams.get('workflow-slug');
      if (workflowSlug) {
        return workflowSlug;
      }
    }, this);

    /**
     * Temporary solution to grab the graph id
     */
    this.graphId = ko.computed(() => {
      if (this.workflowPlugin()) {
        return this.workflowPlugin()?.config?.stepData?.[0].layoutSections?.[0]
          .componentConfigs?.[0].parameters.graphid;
      }
      const searchParams = new URLSearchParams(window.location.search);
      const graphId = searchParams.get('graph-id');
      if (graphId) {
        return graphId;
      }
    }, this);

    this.workflowPluginId = ko.computed(() => {
      return this.workflowPlugin()?.pluginid || '';
    }, this);

    this.loadExistingWorkflow = async () => {
      if (this.workflowSlug()) {
        const workflow = await $.getJSON(
          arches.urls.root + `workflow-builder/plugins?slug=${this.workflowSlug()}`
        );
        this.workflowPlugin(workflow);
      }
    };

    this.init = async () => {
      await this.loadExistingWorkflow();
      this.loadSteps(this.workflowPlugin()?.config.stepData);
      this.workflowName(this.workflowPlugin()?.name);
      this.showWorkflowInSidebar(this.workflowPlugin()?.config.show);
    };

    this.init();
  };

  return ko.components.register('workflow-builder-editor', {
    viewModel: pageViewModel,
    template: pageTemplate
  });
});
