.features = [
  .features[] | select(.properties | .NAME // .NAME10 | test("NC"))
]
