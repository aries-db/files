application = Krita.instance()
current_document = application.activeDocument()

# delete current guides if any
current_document.setHorizontalGuides([])
current_document.setVerticalGuides([])

selection = current_document.selection()

horizental_guides = current_document.horizontalGuides()
horizental_guides.append(selection.y())
horizental_guides.append(selection.y() + selection.height())
current_document.setHorizontalGuides(horizental_guides)

vertical_guides = current_document.verticalGuides()
vertical_guides.append(selection.x())
vertical_guides.append(selection.x() + selection.width())
current_document.setVerticalGuides(vertical_guides)

current_document.refreshProjection()

action = Krita.instance().action('view_show_guides')

if action:
    if action.isChecked() == False:
        action.setChecked(True)
