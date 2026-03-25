application = Krita.instance()
current_document = application.activeDocument()

layers = current_document.topLevelNodes()
i = 0
for layer in layers:
  layer.setName(f"layer-{i:03d}")
  i = i + 1
