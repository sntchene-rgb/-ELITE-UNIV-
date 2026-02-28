import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:lucide_icons/lucide_icons.dart';

/// شاشة الإحصائيات والعقود (لوحة القيادة المتقدمة)
/// تم تصميم هذه الشاشة بمعايير سيادية وأكاديمية متطورة
/// تدعم التجاوب مع مختلف الشاشات (Responsive) وتدعم الاتجاه من اليمين لليسار (RTL)
class StatisticsAndContractsScreen extends StatelessWidget {
  const StatisticsAndContractsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    // فرض اتجاه النص من اليمين لليسار للغة العربية
    return Directionality(
      textDirection: TextDirection.rtl,
      child: Scaffold(
        backgroundColor: const Color(0xFFF8FAFC), // خلفية رمادية فاتحة مريحة للعين
        appBar: _buildAppBar(context),
        body: SingleChildScrollView(
          physics: const BouncingScrollPhysics(),
          padding: const EdgeInsets.all(24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildSectionHeader('الإحصائيات العامة', LucideIcons.barChart3),
              const SizedBox(height: 16),
              _buildResponsiveStatsGrid(context),
              
              const SizedBox(height: 32),
              
              _buildSectionHeader('مؤشر النمو الأكاديمي', LucideIcons.trendingUp),
              const SizedBox(height: 16),
              _buildChartCard(context),
              
              const SizedBox(height: 32),
              
              _buildSectionHeader('أحدث العقود الموثقة', LucideIcons.fileSignature),
              const SizedBox(height: 16),
              _buildContractsList(context),
            ],
          ),
        ),
      ),
    );
  }

  /// شريط التنقل العلوي (AppBar)
  PreferredSizeWidget _buildAppBar(BuildContext context) {
    return AppBar(
      backgroundColor: Colors.white,
      elevation: 0,
      scrolledUnderElevation: 1,
      shadowColor: Colors.black.withOpacity(0.1),
      title: const Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'لوحة القيادة السيادية',
            style: TextStyle(
              color: Color(0xFF1E3A8A), // أزرق داكن
              fontWeight: FontWeight.bold,
              fontSize: 20,
            ),
          ),
          Text(
            'إحصائيات وعقود منصة النخبة الجامعية',
            style: TextStyle(
              color: Colors.grey,
              fontSize: 12,
            ),
          ),
        ],
      ),
      actions: [
        IconButton(
          icon: const Icon(LucideIcons.bell, color: Color(0xFF1E3A8A)),
          onPressed: () {},
        ),
        const Padding(
          padding: EdgeInsets.symmetric(horizontal: 16.0),
          child: CircleAvatar(
            backgroundColor: Color(0xFFD97706), // لون ذهبي/عنبري
            child: Text('M', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
          ),
        ),
      ],
    );
  }

  /// عنوان القسم مع أيقونة
  Widget _buildSectionHeader(String title, IconData icon) {
    return Row(
      children: [
        Icon(icon, color: const Color(0xFFD97706), size: 24),
        const SizedBox(width: 8),
        Text(
          title,
          style: const TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
            color: Color(0xFF1E3A8A),
          ),
        ),
      ],
    );
  }

  /// شبكة الإحصائيات المتجاوبة
  Widget _buildResponsiveStatsGrid(BuildContext context) {
    // تحديد عدد الأعمدة بناءً على عرض الشاشة
    final screenWidth = MediaQuery.of(context).size.width;
    int crossAxisCount = screenWidth > 1200 ? 4 : (screenWidth > 800 ? 3 : (screenWidth > 600 ? 2 : 1));

    return GridView.count(
      crossAxisCount: crossAxisCount,
      crossAxisSpacing: 16,
      mainAxisSpacing: 16,
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      childAspectRatio: screenWidth > 600 ? 1.5 : 2.0,
      children: const [
        StatCard(
          title: 'إجمالي العقود',
          value: '1,245',
          icon: LucideIcons.fileText,
          color: Color(0xFF3B82F6),
          trend: '+12%',
          isPositiveTrend: true,
        ),
        StatCard(
          title: 'المحتوى الأكاديمي',
          value: '8,430',
          icon: LucideIcons.bookOpen,
          color: Color(0xFF10B981),
          trend: '+24%',
          isPositiveTrend: true,
        ),
        StatCard(
          title: 'الأساتذة والباحثين',
          value: '3,210',
          icon: LucideIcons.users,
          color: Color(0xFF8B5CF6),
          trend: '+5%',
          isPositiveTrend: true,
        ),
        StatCard(
          title: 'عقود قيد المراجعة',
          value: '42',
          icon: LucideIcons.clock,
          color: Color(0xFFF59E0B),
          trend: '-2%',
          isPositiveTrend: false,
        ),
      ],
    );
  }

  /// بطاقة الرسم البياني (Chart)
  Widget _buildChartCard(BuildContext context) {
    return Container(
      height: 300,
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.03),
            blurRadius: 20,
            offset: const Offset(0, 10),
          ),
        ],
        border: Border.all(color: Colors.grey.shade100),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'معدل توثيق العقود ورفع المحتوى (2026)',
            style: TextStyle(fontWeight: FontWeight.bold, color: Colors.grey),
          ),
          const SizedBox(height: 24),
          Expanded(
            child: LineChart(
              LineChartData(
                gridData: FlGridData(
                  show: true,
                  drawVerticalLine: false,
                  horizontalInterval: 20,
                  getDrawingHorizontalLine: (value) {
                    return FlLine(color: Colors.grey.shade200, strokeWidth: 1);
                  },
                ),
                titlesData: FlTitlesData(
                  show: true,
                  rightTitles: const AxisTitles(sideTitles: SideTitles(showTitles: false)),
                  topTitles: const AxisTitles(sideTitles: SideTitles(showTitles: false)),
                  bottomTitles: AxisTitles(
                    sideTitles: SideTitles(
                      showTitles: true,
                      reservedSize: 30,
                      getTitlesWidget: (value, meta) {
                        const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'];
                        if (value.toInt() >= 0 && value.toInt() < months.length) {
                          return Padding(
                            padding: const EdgeInsets.only(top: 8.0),
                            child: Text(months[value.toInt()], style: const TextStyle(color: Colors.grey, fontSize: 12)),
                          );
                        }
                        return const Text('');
                      },
                    ),
                  ),
                ),
                borderData: FlBorderData(show: false),
                lineBarsData: [
                  LineChartBarData(
                    spots: const [
                      FlSpot(0, 20),
                      FlSpot(1, 45),
                      FlSpot(2, 35),
                      FlSpot(3, 80),
                      FlSpot(4, 65),
                      FlSpot(5, 100),
                    ],
                    isCurved: true,
                    color: const Color(0xFF1E3A8A),
                    barWidth: 4,
                    isStrokeCapRound: true,
                    dotData: const FlDotData(show: false),
                    belowBarData: BarAreaData(
                      show: true,
                      color: const Color(0xFF1E3A8A).withOpacity(0.1),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  /// قائمة العقود
  Widget _buildContractsList(BuildContext context) {
    final contracts = [
      {'title': 'عقد نشر كتاب: الذكاء الاصطناعي', 'author': 'د. أحمد محمود', 'date': '27 فيفري 2026', 'status': 'موثق', 'color': Colors.green},
      {'title': 'عقد أستاذ زائر', 'author': 'د. سارة خالد', 'date': '26 فيفري 2026', 'status': 'قيد المراجعة', 'color': Colors.orange},
      {'title': 'ملكية فكرية: خوارزميات التشفير', 'author': 'د. محمد علي', 'date': '25 فيفري 2026', 'status': 'موثق', 'color': Colors.green},
      {'title': 'عقد شراكة بحثية', 'author': 'جامعة الجزائر 1', 'date': '20 فيفري 2026', 'status': 'مرفوض', 'color': Colors.red},
    ];

    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.03),
            blurRadius: 20,
            offset: const Offset(0, 10),
          ),
        ],
        border: Border.all(color: Colors.grey.shade100),
      ),
      child: ListView.separated(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        itemCount: contracts.length,
        separatorBuilder: (context, index) => Divider(color: Colors.grey.shade100, height: 1),
        itemBuilder: (context, index) {
          final contract = contracts[index];
          return ListTile(
            contentPadding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
            leading: Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: (contract['color'] as Color).withOpacity(0.1),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Icon(LucideIcons.fileSignature, color: contract['color'] as Color),
            ),
            title: Text(
              contract['title'] as String,
              style: const TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF1E3A8A)),
            ),
            subtitle: Padding(
              padding: const EdgeInsets.only(top: 4.0),
              child: Row(
                children: [
                  Icon(LucideIcons.user, size: 14, color: Colors.grey.shade500),
                  const SizedBox(width: 4),
                  Text(contract['author'] as String, style: TextStyle(color: Colors.grey.shade600, fontSize: 12)),
                  const SizedBox(width: 16),
                  Icon(LucideIcons.calendar, size: 14, color: Colors.grey.shade500),
                  const SizedBox(width: 4),
                  Text(contract['date'] as String, style: TextStyle(color: Colors.grey.shade600, fontSize: 12)),
                ],
              ),
            ),
            trailing: Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
              decoration: BoxDecoration(
                color: (contract['color'] as Color).withOpacity(0.1),
                borderRadius: BorderRadius.circular(20),
              ),
              child: Text(
                contract['status'] as String,
                style: TextStyle(
                  color: contract['color'] as Color,
                  fontWeight: FontWeight.bold,
                  fontSize: 12,
                ),
              ),
            ),
            onTap: () {
              // فتح تفاصيل العقد
            },
          );
        },
      ),
    );
  }
}

/// ويدجت بطاقة الإحصائيات (Stat Card)
class StatCard extends StatelessWidget {
  final String title;
  final String value;
  final IconData icon;
  final Color color;
  final String trend;
  final bool isPositiveTrend;

  const StatCard({
    super.key,
    required this.title,
    required this.value,
    required this.icon,
    required this.color,
    required this.trend,
    required this.isPositiveTrend,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.03),
            blurRadius: 20,
            offset: const Offset(0, 10),
          ),
        ],
        border: Border.all(color: Colors.grey.shade100),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: color.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Icon(icon, color: color, size: 24),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: isPositiveTrend ? Colors.green.withOpacity(0.1) : Colors.red.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Row(
                  children: [
                    Icon(
                      isPositiveTrend ? LucideIcons.trendingUp : LucideIcons.trendingDown,
                      color: isPositiveTrend ? Colors.green : Colors.red,
                      size: 14,
                    ),
                    const SizedBox(width: 4),
                    Text(
                      trend,
                      style: TextStyle(
                        color: isPositiveTrend ? Colors.green : Colors.red,
                        fontWeight: FontWeight.bold,
                        fontSize: 12,
                      ),
                      textDirection: TextDirection.ltr,
                    ),
                  ],
                ),
              ),
            ],
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: TextStyle(
                  color: Colors.grey.shade500,
                  fontSize: 14,
                  fontWeight: FontWeight.w600,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                value,
                style: const TextStyle(
                  color: Color(0xFF1E3A8A),
                  fontSize: 28,
                  fontWeight: FontWeight.black,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
