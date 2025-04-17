import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';

// Service for generating PDF reports
export const PDFService = {
  // Generate a PDF report of test results
  generateResultsPDF: async (testResults, questions, userAnswers) => {
    try {
      const pdf = new jsPDF();
      
      // Add title
      pdf.setFontSize(20);
      pdf.setTextColor(0, 120, 212); // Microsoft blue
      pdf.text('DP-600 Exam Preparation Results', 105, 15, { align: 'center' });
      
      // Add subtitle
      pdf.setFontSize(12);
      pdf.setTextColor(100, 100, 100);
      pdf.text('Microsoft Fabric Analytics Engineer Associate', 105, 22, { align: 'center' });
      
      // Add date
      const date = new Date().toLocaleDateString();
      pdf.setFontSize(10);
      pdf.text(`Generated on: ${date}`, 105, 28, { align: 'center' });
      
      // Add overall score
      pdf.setFontSize(14);
      pdf.setTextColor(0, 0, 0);
      pdf.text('Overall Score', 14, 40);
      
      pdf.setFontSize(12);
      pdf.text(`Score: ${testResults.score}/${testResults.total} (${testResults.percentage}%)`, 14, 48);
      pdf.text(`Result: ${testResults.isPassing ? 'PASS' : 'FAIL'}`, 14, 54);
      
      // Add category breakdown
      pdf.setFontSize(14);
      pdf.text('Category Breakdown', 14, 65);
      
      const categoryData = [];
      Object.entries(testResults.categoryResults).forEach(([category, results]) => {
        const formattedCategory = category
          .split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
          
        categoryData.push([
          formattedCategory,
          `${results.correct}/${results.total}`,
          `${results.percentage}%`
        ]);
      });
      
      pdf.autoTable({
        startY: 70,
        head: [['Category', 'Score', 'Percentage']],
        body: categoryData,
        theme: 'grid',
        headStyles: { fillColor: [0, 120, 212], textColor: 255 },
        styles: { fontSize: 10 }
      });
      
      // Add question analysis
      pdf.setFontSize(14);
      pdf.text('Question Analysis', 14, pdf.autoTable.previous.finalY + 15);
      
      const questionData = [];
      questions.forEach((question, index) => {
        const userAnswer = userAnswers[question.id] || 'Not answered';
        const correctAnswer = question.correct_answer || 'N/A';
        const isCorrect = userAnswer === correctAnswer;
        
        questionData.push([
          `${index + 1}`,
          isCorrect ? '✓' : '✗',
          userAnswer,
          correctAnswer
        ]);
      });
      
      pdf.autoTable({
        startY: pdf.autoTable.previous.finalY + 20,
        head: [['#', 'Result', 'Your Answer', 'Correct Answer']],
        body: questionData,
        theme: 'grid',
        headStyles: { fillColor: [0, 120, 212], textColor: 255 },
        styles: { fontSize: 10 },
        columnStyles: {
          0: { cellWidth: 15 },
          1: { cellWidth: 20 },
          2: { cellWidth: 70 },
          3: { cellWidth: 70 }
        }
      });
      
      // Add footer
      const pageCount = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(150, 150, 150);
        pdf.text(
          'DP-600 Exam Preparation App | Microsoft Fabric Analytics Engineer Associate',
          105,
          pdf.internal.pageSize.height - 10,
          { align: 'center' }
        );
        pdf.text(
          `Page ${i} of ${pageCount}`,
          pdf.internal.pageSize.width - 20,
          pdf.internal.pageSize.height - 10
        );
      }
      
      return pdf;
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw error;
    }
  },
  
  // Save the PDF file
  savePDF: (pdf, filename = 'dp600-exam-results.pdf') => {
    pdf.save(filename);
  }
};

export default PDFService;
