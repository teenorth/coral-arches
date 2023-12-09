define([
  'jquery',
  'knockout',
  'knockout-mapping',
  'arches',
  'templates/views/components/plugins/workflow-builder.htm',
  'plugins/knockout-select2'
], function ($, ko, koMapping, arches, pageTemplate) {
  const pageViewModel = function (params) {
    this.selectedResource = ko.observable();

    this.selectedResource.subscribe((value) => {
      console.log('selectedResource: ', value);
    });

    this.resources = ko.observable();

    this.openWorkflowBuilder = (graphId) => {
      console.log('graphId: ', graphId);
      const url = `workflow-builder-editor?graph-id=${graphId}`;
      window.location.href = arches.urls.plugin(url);
    };

    this.init = async () => {
      const resources = await (
        await window.fetch(arches.urls.root + `workflow-builder/resources`)
      ).json();
      console.log('resources: ', resources);
      this.resources(resources.resources);
    };

    this.init();
  };

  return ko.components.register('workflow-builder', {
    viewModel: pageViewModel,
    template: pageTemplate
  });
});