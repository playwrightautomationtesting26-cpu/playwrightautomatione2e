export default class TestData {
  /**
   * Test data combinations
   *
   * 1. Dropdown
   * - Tokyo CURA Healthcare Center
   * - Hongkong CURA Healthcare Center
   * - Seoul CURA Healthcare Center
   *
   * 2. Healthcare Program
   * - Medicare
   * - Medicaid
   * - None
   *
   * 3. Different date
   * - 05/10/2028
   * - 05/10/2029
   * - 05/10/2030
   *
   **/

  static makeAppointTestData() {
    return [
      {
        testId: 'TC001',
        Facility: 'Tokyo CURA Healthcare Center',
        healthcareProgram: 'Medicare',
        Vistdate: '05/10/2028',
      },
      // {
      //   testId: 'TC002',
      //   Facility: 'Hongkong CURA Healthcare Center',
      //   healthcareProgram: 'Medicaid',
      //   Vistdate: '05/10/2029',
      // },
      // {
      //   testId: 'TC003',
      //   Facility: 'Seoul CURA Healthcare Center',
      //   healthcareProgram: 'None',
      //   Vistdate: '05/10/2030',
      // },
    ]
  }

  static apiUserCreation() {
    return [
      {
        name: "Amitava",
        job: "EY- Senior-1",
        id: '669'
      }
    ]

  }
}
