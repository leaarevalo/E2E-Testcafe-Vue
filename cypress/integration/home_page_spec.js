describe("Pagina principal", () => {
  it("Deberia cargar correctamente", () => {
    cy.visit("/");
  });
  it("Deberia tener un titulo 'users' que sea h1 ", () => {
    //cy.contains("Users");
    //Respeta mayusculas y minusculas
    cy.get("#titulo").should("contain", "Users");
  });
  it("Deberia tener una tabla con 3 elementos ", () => {
    //cy.contains("Users");
    //Respeta mayusculas y minusculas
    cy.get("table tbody tr").should("have.length", 3);
  });
  it("Deberia mostrar el detalle del user '1' al hacer click en el boton de dicho user, y volver al home", () => {
    cy.get("a.btn-info")
      .eq(0)
      .click();
    cy.url().should("include", "/user/1");
    //cy.pause(); ==> Se puede agregar una pausa
    cy.get("button.btn-info").click();
    cy.url().should("include", "/");
  });
  it("Deberia navegar por los componentes del nav", () => {
    cy.get("a.nav-link")
      .eq(0)
      .click();
    cy.url().should("include", "/home");
    cy.get("a.nav-link")
      .eq(1)
      .click();
    cy.url().should("include", "/about");
    cy.get("a.nav-link")
      .eq(2)
      .click();
    cy.url().should("include", "/contact");
    cy.get("a.nav-link")
      .eq(3)
      .click();
    cy.url().should("include", "/todo");
  });
});

describe("Pagina Todo", () => {
  it("Comienza desde /todo", () => {
    cy.visit("/todo");
    cy.url().should("include", "/todo");
  });
  it("Deberia tener 2 todo al comenzar", () => {
    cy.get("table tbody tr").should("have.length", 2);
  });
  it("Deberia agregar un todo a la lista que diga 'Hacer las compras'", () => {
    cy.get("input.form-control")
      .type("Hacer las compras")
      .should("have.value", "Hacer las compras");
    cy.get("button#btnAdd").click(); //Busco por el ID
    cy.get("table tbody tr").should("have.length", 3);
  });
  it("Deberia eliminar correctamente el ultimo todo agregado", () => {
    cy.get("button.btn-danger")
      .eq(-1)
      .click(); //EQ negativo empieza desde arriba
    cy.get("table tbody tr").should("have.length", 2);
  });
});
